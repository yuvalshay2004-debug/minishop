pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // שימוש ב־absolute path יחסית ל־workspace של Jenkins
                dir("${env.WORKSPACE}/api-service") {
                    sh 'docker build -t minishop/backend .'
                }
                dir("${env.WORKSPACE}/frontend-service") {
                    sh 'docker build -t minishop/frontend .'
                }
            }
        }

        stage('Test') {
            steps {
                // 1. בדיקות יחידה ל־backend/API
                dir("${env.WORKSPACE}/api-service") {
                    sh 'pytest tests/unit'
                }

                // 2. בדיקות אינטגרציה בסיסיות
                dir("${env.WORKSPACE}/tests/integration") {
                    sh 'pytest'
                }

                // 3. Ping / Health check
                sh 'docker exec minishop_backend_container_name curl -f http://192.168.1.204:5000/health || echo "Backend not healthy"'
                sh 'docker exec minishop_frontend_container_name curl -f http://192.168.1.204:8081 || echo "Frontend not healthy"'
            }
        }

        stage('Deploy') {
            steps {
                dir("${env.WORKSPACE}") {
                    // עצירת הקונטיינרים הקיימים לפי שם מדויק
                    sh 'docker stop minishop_backend || true'
                    sh 'docker rm minishop_backend || true'
                    sh 'docker stop minishop_frontend || true'
                    sh 'docker rm minishop_frontend || true'

                    // הרצה מחדש עם docker-compose
                    sh 'docker compose up -d'
                }
            }
        }
    }
}

