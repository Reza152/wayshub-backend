pipeline {
    agent any

    environment {
        DOCKER_HUB_CRED = 'docker-hub-credentials'
        IMAGE_NAME      = 'reza1019/wayshub-backend'
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Reza152/wayshub-backend.git'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_HUB_CRED}") {
                        def customImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                        customImage.push()
                        customImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(['ssh-backend-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no reza@172.31.15.141 "
                            docker pull ${IMAGE_NAME}:latest &&
                            docker stop backend-app || true &&
                            docker rm backend-app || true &&
                            docker run -d --name backend-app -p 5000:5000 ${IMAGE_NAME}:latest
                        "
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
            cleanWs()
        }
    }
}
