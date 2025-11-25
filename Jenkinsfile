pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('minishop/api-service') {
                    sh 'docker build . -t minishop/backend'
                }
                dir('minishop/frontend-service') {
                    sh 'docker build . -t minishop/frontend'
                }
            }
        }

        stage('Test') {
            steps {
                // 1. Unit tests for backend/API
                sh 'cd minishop/api-service && pytest tests/unit'

                // 2. Basic integration tests (frontend-backend)
                sh 'cd minishop/tests/integration && pytest'

                // 3. Ping / health check for containers
                sh 'docker exec minishop_backend_container_name curl -f http://192.168.1.204:5000/health || echo "Backend not healthy"'
                sh 'docker exec minishop_frontend_container_name curl -f http://192.168.1.204:8081 || echo "Frontend not healthy"'
            }
        }

        stage('Deploy') {
            steps {
                dir('minishop') {
                    // עצירת הקונטיינרים הקיימים לפי שם
                    sh 'docker stop minishop_backend || true'
                    sh 'docker rm minishop_backend || true'
                    sh 'docker stop minishop_frontend || true'
                    sh 'docker rm minishop_frontend || true'

                    // הרצה מחדש
                    sh 'docker compose up -d'
                }
            }
        }
    }
}
