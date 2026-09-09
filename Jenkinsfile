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
            discordSend(
                webhookURL: 'https://discord.com/api/webhooks/1547146694569893911/ktPHbF2-M16wIgvGbQclZgIiR23v5p3D9aH5Mu_gJggeOBoG9UWRZhSsdwMAN3LXt4Eq',
                result: 'SUCCESS',
                description: 'wayshub-backend berhasil di-build dan deploy.'
            )
        }
        failure {
            discordSend(
                webhookURL: 'https://discord.com/api/webhooks/1547146694569893911/ktPHbF2-M16wIgvGbQclZgIiR23v5p3D9aH5Mu_gJggeOBoG9UWRZhSsdwMAN3LXt4Eq',
                result: 'FAILURE',
                description: 'wayshub-backend gagal di-build atau deploy!'
            )
        }
    }
}
