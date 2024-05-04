# sets up a Virtual Private Cloud (VPC) with a CIDR block of 10.0.0.0/16.
# creates an Internet Gateway and attaches it to the VPC.
# sets up a security group that allows inbound traffic on port 80.
# creates four subnets within the VPC, two public and two private, each with its own CIDR block and availability zone.
# sets up an Elastic Container Service (ECS) cluster.
# creates an Application Load Balancer (ALB) that is associated with the public subnets and the security group.
# sets up a route table for the VPC and associates it with all the subnets.
# creates two target groups for the ALB, one for the frontend and one for the backend.
# sets up two listeners for the ALB, one for the frontend and one for the backend, each forwarding traffic to its respective target group.
# creates two ECS services, one for the frontend and one for the backend, each with its own task definition and network configuration. 
# The frontend service is associated with the public subnets and the backend service with the private subnets.
# creates two ECS task definitions, one for the frontend and one for the backend, each specifying the container image to use, the CPU and memory to allocate, and the port mappings.
# finally, it outputs the DNS name of the ALB, which can be used to make requests to the backend service.

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

resource "aws_security_group" "web_sg" {
  name        = "web_sg"
  description = "Allow inbound traffic on port 80"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group_rule" "allow_http" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.web_sg.id
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

resource "aws_ecs_cluster" "robohub_cluster" {
  name = "robohub-cluster"
}

resource "aws_lb" "alb" {
  name               = "robohub-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web_sg.id]
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
  name            = "frontend-service"
  cluster         = aws_ecs_cluster.robohub_cluster.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  health_check_grace_period_seconds = 300
  launch_type     = "FARGATE"

  network_configuration {
    subnets = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.web_sg.id]
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
      image = "${var.docker_username}/robohub-client:latest"
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
    }
  ])
}

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
  name            = "backend-service"
  cluster         = aws_ecs_cluster.robohub_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets = [aws_subnet.private_subnet_1.id, aws_subnet.private_subnet_2.id]
    assign_public_ip = false
    security_groups  = [aws_security_group.web_sg.id]
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
      image = "${var.docker_username}/robohub-server:latest"
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