
pipeline {
    agent any

    environment {
        PATH = "/Users/rameshraju/.docker/bin:/opt/homebrew/bin:${env.PATH}"
        WEB_APP_URL = "https://playwrightpad.com/sandbox/ecommerce"
    }

    stages {

        stage('Welcome') {
            steps {
                echo 'Welcome to Playwright Jenkins CI Pipeline!'
            }
        }

        stage('Create Environment File') {
            steps {
                sh '''
                    echo "WEB_APP_URL=$WEB_APP_URL" > .env
                    echo ".env file created successfully"
                '''
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

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
        }

        success {
            echo 'Playwright pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Please check the console output.'
        }
    }
}
