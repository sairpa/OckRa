pipeline {
    agent any
    environment {
        CI = 'true'
        registry = "ockra13/occupancy-chart-generation" 

        registryCredential = 'dockerscred' 

        dockerImage = ''
    }
    stages {
        stage('Cloning Git') {
            steps {
                git branch: 'wip-logesh',url:'https://github.com/sairpa/OckRa.git'    
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Jest test'){
            steps{
                sh 'npm test'
            }
        }
        
        stage('Building our image') { 

            steps { 

                script { 

                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 

                }

            } 

        }

        stage('Deploy our image') { 

            steps { 

                script { 

                    docker.withRegistry( '', registryCredential ) { 

                        dockerImage.push() 

                    }

                } 

            }

        } 

        stage('Cleaning up') { 

            steps { 

                sh "docker rmi $registry:$BUILD_NUMBER" 

            }

        }
    }
}