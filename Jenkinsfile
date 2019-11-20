pipeline {
  agent any
  stages {
    stage('Build Monitoring') {
      steps {
        sh '''cd monitoring-service
chmod +x startup.sh
./startup.sh'''
      }
    }

  }
}
