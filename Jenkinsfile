pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir("${env.WORKSPACE}") {
                    echo "Building Docker images..."
                    sh 'docker compose build'
                }
            }
        }

        stage('Test') {
            steps {
                echo "No tests defined yet"
                // אפשר להוסיף כאן בדיקות בעתיד
            }
        }

        stage('Deploy') {
            steps {
                dir("${env.WORKSPACE}") {
                    echo "Stopping old containers..."
                    sh 'docker compose down --remove-orphans'

                    echo "Starting containers..."
                    sh 'docker compose up -d'
                }
            }
        }
    }
}
