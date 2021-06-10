pipeline {
    agent any
    environment {
        CI = 'true'
        registry = "ockra13/occupancy-chart-generation" 
4
        registryCredential = 'dockerscred' 
5
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
15
            steps { 
16
                script { 
17
                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 
18
                }
19
            } 
20
        }

        stage('Deploy our image') { 
22
            steps { 
23
                script { 
24
                    docker.withRegistry( '', registryCredential ) { 
25
                        dockerImage.push() 
26
                    }
27
                } 
28
            }
29
        } 
30
        stage('Cleaning up') { 
31
            steps { 
32
                sh "docker rmi $registry:$BUILD_NUMBER" 
33
            }
34
        }
    }
}