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

    post {
        success {
            script {
                sh '''
                    curl -H "Content-Type: application/json" \
                    -X POST \
                    -d '{
                      "embeds": [{
                        "title": "Jenkins Build SUCCESS",
                        "description": "wayshub-backend berhasil di-build dan deploy.",
                        "color": 3066993
                      }]
                    }' \
                    https://discord.com/api/webhooks/1547146694569893911/ktPHbF2-M16wIgvGbQclZgIiR23v5p3D9aH5Mu_gJggeOBoG9UWRZhSsdwMAN3LXt4Eq
                '''
            }
        }
        failure {
            script {
                sh '''
                    curl -H "Content-Type: application/json" \
                    -X POST \
                    -d '{
                      "embeds": [{
                        "title": "Jenkins Build FAILED",
                        "description": "wayshub-backend gagal di-build atau deploy. Cek console Jenkins!",
                        "color": 15158332
                      }]
                    }' \
                    https://discord.com/api/webhooks/1547146694569893911/ktPHbF2-M16wIgvGbQclZgIiR23v5p3D9aH5Mu_gJggeOBoG9UWRZhSsdwMAN3LXt4Eq
                '''
            }
        }
    }
}
