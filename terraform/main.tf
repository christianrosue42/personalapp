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

data "aws_security_group" "robohub_security_group" {
  id = "sg-0df390e3dc6a66a3a" # replace with your security group ID
}

resource "aws_ecs_cluster" "robohub_cluster" {
  name = "robohub-cluster"
}

resource "aws_ecs_task_definition" "frontend_task" {
  family                   = "frontend-task-family"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
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

resource "aws_ecs_task_definition" "backend_task" {
  family                   = "backend-task-family"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
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

resource "aws_lb" "robohub-alb" {
  name               = "robohub-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [data.aws_security_group.robohub_security_group.id]
  subnets            = ["subnet-0afdbd7d557928c5c", "subnet-0e526cdda6e37f6d1"] # replace with your public subnet IDs
}

resource "aws_lb_target_group" "frontend_target_group" {
  name     = "frontend-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "vpc-0efa3fb84f70b7b31" # replace with your VPC ID
  target_type = "ip"

}

resource "aws_lb_target_group" "backend_target_group" {
  name     = "backend-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = "vpc-0efa3fb84f70b7b31" # replace with your VPC ID
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

resource "aws_lb_listener" "backend_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 3000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_target_group.arn
  }
}

resource "aws_ecs_service" "frontend_service" {
  name            = "frontend-service"
  cluster         = aws_ecs_cluster.robohub_cluster.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets = ["subnet-0afdbd7d557928c5c", "subnet-0e526cdda6e37f6d1"] # replace with your public subnet IDs
    assign_public_ip = true
    security_groups  = [data.aws_security_group.robohub_security_group.id]
  }

  desired_count = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_target_group.arn
    container_name   = "frontend-container"
    container_port   = 80
  }
}

resource "aws_ecs_service" "backend_service" {
  name            = "backend-service"
  cluster         = aws_ecs_cluster.robohub_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets = ["subnet-0e4c5dc357e11c54e", "subnet-0a19e52ecfd2d02dc"] # replace with your private subnet IDs
    assign_public_ip = false
    security_groups  = [data.aws_security_group.robohub_security_group.id]
  }

  desired_count = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_target_group.arn
    container_name   = "backend-container"
    container_port   = 3000
  }

  
}