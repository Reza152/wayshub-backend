pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Reza152/wayshub-backend.git'
            }
        }

        stage('Deploy Backend to Staging') {
            steps {
                sshagent(['ssh-backend-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no reza@172.31.15.141 "
                            cd ~/wayshub-backend &&
                            git pull origin main &&
                            docker compose up -d --build
                        "
                    '''
                }
            }
        }
    }
}
