pipeline {
    agent any

    environment {
        PATH = "/Users/rameshraju/.docker/bin:/opt/homebrew/bin:${env.PATH}"
    }

    stages {

        stage('Welcome') {
            steps {
                echo 'Welcome to Playwright Jenkins CI Pipeline!'
            }
        }

        stage('Checkout') {
            steps {
                echo 'Checking out project from GitHub'
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                sh 'java -version'
                sh 'git --version'
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker compose build playwright-tests'
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                sh 'docker compose run --rm playwright-tests regression'
            }
        }
    }

    post {
        success {
            echo 'Playwright pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Please check the console output.'
        }
    }
}