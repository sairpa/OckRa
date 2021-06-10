pipeline {
    agent any
    environment {
        CI = 'true'
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
        
        stage('Docker image creation') {
            steps {
                sh '''docker login --username ockra13 --password ockra13
                docker build . -t ockra13/Occupancy-chart-generation --pull=true
                docker push ockra13/Occupancy-chart-generation
                '''
                echo "Completed docker image building"
            }
        }
    }
}