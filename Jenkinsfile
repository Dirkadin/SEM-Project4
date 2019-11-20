pipeline {
  agent any
  stages {
    stage('Build Monitoring') {
      steps {
        sh '''cd monitoring-service
./startup.sh'''
      }
    }

  }
}