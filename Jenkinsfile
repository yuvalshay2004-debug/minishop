pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // שימוש ב־absolute path יחסית ל־workspace של Jenkins
                dir("${env.WORKSPACE}"){      
                       sh 'docker compose build'

                }
            }
        }

        stage('Test') {
            steps {
   	
            }
        }

        stage('Deploy') {
            steps {
                dir("${env.WORKSPACE}") {
                    // עצירת הקונטיינרים הקיימים לפי שם מדויק
                    sh 'docker compose down --remove-orphans'

                    // הרצה מחדש עם docker-compose
                    sh 'docker compose up -d'
                }
            }
        }
    }
}

