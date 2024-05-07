# Description: This file contains the main terraform configuration to create the infrastructure for the Robohub application.
# It creates a VPC with public and private subnets, NAT gateways, route tables, security groups, an ECS cluster, an Application Load Balancer (ALB), and ECS services for the frontend and backend components of the Robohub application.
# The frontend service runs a containerized React application on port 80, and the backend service runs a containerized Node.js API on port 3000.
# The ALB listens on ports 80 and 3000 and forwards requests to the frontend and backend services respectively.
# The output of this configuration is the DNS name of the ALB, which can be used to make requests to the backend service.
# Note: The container images for the frontend and backend services are hosted on Docker Hub and are publicly accessible. You can replace them with your own images if needed.

terraform {
  backend "s3" {
    bucket = "robohub-terraform-state"
    key    = "terraformstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = "eu-central-1"
}

data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_subnet" "public_subnet_1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "eu-central-1a"
}

resource "aws_subnet" "public_subnet_2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "eu-central-1b"
}

resource "aws_subnet" "private_subnet_1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "eu-central-1a"
}

resource "aws_subnet" "private_subnet_2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.4.0/24"
  availability_zone = "eu-central-1b"
}

resource "aws_eip" "nat_eip" {
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_subnet_1.id
}

resource "aws_route_table" "main_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
    }
}

resource "aws_main_route_table_association" "main_route_table_association" {
  vpc_id = aws_vpc.main.id
  route_table_id = aws_route_table.main_route_table.id
}

resource "aws_route_table" "private_route_table_1" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
}

resource "aws_route_table_association" "private_subnet_1_association" {
  subnet_id      = aws_subnet.private_subnet_1.id
  route_table_id = aws_route_table.private_route_table_1.id
}

resource "aws_eip" "nat_eip_2" {
}

resource "aws_nat_gateway" "nat_2" {
  allocation_id = aws_eip.nat_eip_2.id
  subnet_id     = aws_subnet.public_subnet_2.id
}

resource "aws_route_table" "private_route_table_2" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_2.id
  }
}

resource "aws_route_table_association" "private_subnet_2_association" {
  subnet_id      = aws_subnet.private_subnet_2.id
  route_table_id = aws_route_table.private_route_table_2.id
}

resource "aws_security_group" "web_sg" {
  name        = "web_sg"
  description = "Allow inbound traffic on port 80"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group_rule" "web_sg_ingress" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.web_sg.id
}

resource "aws_security_group_rule" "web_sg_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.web_sg.id
}

resource "aws_security_group" "app_sg" {
  name        = "app_sg"
  description = "Allow inbound traffic on port 3000"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group_rule" "app_sg_ingress" {
  type              = "ingress"
  from_port         = 3000
  to_port           = 3000
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.app_sg.id
}

resource "aws_security_group_rule" "app_sg_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.app_sg.id
}

resource "aws_ecs_cluster" "robohub_cluster" {
  name = "robohub_cluster"
}

resource "aws_lb" "alb" {
  name               = "robohub-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web_sg.id, aws_security_group.app_sg.id]
  subnets            = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
}

resource "aws_lb_target_group" "frontend_target_group" {
  name     = "frontend-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"
}

resource "aws_lb_listener" "frontend_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_target_group.arn
  }
}

resource "aws_ecs_service" "frontend_service" {
  name            = "frontend_service"
  cluster         = aws_ecs_cluster.robohub_cluster.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  health_check_grace_period_seconds = 300
  launch_type     = "FARGATE"

  network_configuration {
    subnets = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.web_sg.id, aws_security_group.app_sg.id]
  }

  desired_count = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_target_group.arn
    container_name   = "frontend-container"
    container_port   = 80
  }
}

resource "aws_ecs_task_definition" "frontend_task" {
  family                   = "frontend-task-family"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024" # 1 vCPU
  memory                   = "2048" # 2 GB
  execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "frontend-container"
      image = "crosue/robohub-ui:latest" 
      
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ],

        environment = [
            {
            name  = "REACT_APP_BACKEND_URL"
            value = "http://${aws_lb.alb.dns_name}:3000"
            }
        ]
    }
  ])
}

# create baclend resources

resource "aws_lb_target_group" "backend_target_group" {
  name     = "backend-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"
}

resource "aws_lb_listener" "backend_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 3000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_target_group.arn
  }
}

resource "aws_ecs_service" "backend_service" {
  name            = "backend_service"
  cluster         = aws_ecs_cluster.robohub_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets = [aws_subnet.private_subnet_1.id, aws_subnet.private_subnet_2.id]
    assign_public_ip = false
    security_groups  = [aws_security_group.web_sg.id, aws_security_group.app_sg.id]
  }

  desired_count = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_target_group.arn
    container_name   = "backend-container"
    container_port   = 3000
  }
}

resource "aws_ecs_task_definition" "backend_task" {
  family                   = "backend-task-family"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024" # 1 vCPU
  memory                   = "2048" # 2 GB
  execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "backend-container"
      image = "crosue/robohub-backend:latest"
    
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]
    }
  ])
}

output "load_balancer_dns_name" {
  description = "value of the ALB DNS name to make requests to the backend service"  
  value = aws_lb.alb.dns_name
}