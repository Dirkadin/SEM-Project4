pipeline {
  agent any
  stages {
    stage('Build Monitoring') {
      steps {
        sh '''cd ordering-service
chmod +x startup.sh
./startup.sh'''
      }
    }

  }
}
