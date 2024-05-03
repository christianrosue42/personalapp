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

resource "aws_ecs_service" "frontend_service" {
  name            = "frontend-service"
  cluster         = aws_ecs_cluster.robohub_cluster.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets = ["subnet-0afdbd7d557928c5c", "subnet-0e526cdda6e37f6d1"] # replace with your public subnet IDs
    assign_public_ip = true
  }

  desired_count = 1
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
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "backend_service" {
  name            = "backend-service"
  cluster         = aws_ecs_cluster.robohub_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets = ["subnet-0a19e52ecfd2d02dc", "subnet-0e4c5dc357e11c54e"] # replace with your private subnet IDs
    assign_public_ip = false
  }

  desired_count = 1
}