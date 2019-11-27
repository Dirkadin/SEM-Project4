pipeline {
  agent any
  stages {
    stage('Build Ordering') {
      steps {
        sh 'ls -l ordering-service'
        sh 'chmod +x ordering-service/startup.sh'
        sh './ordering-service/startup.sh'
      }
    }

    stage('Build Monitoring') {
      steps {
        sh 'cd monitoring-service'
        sh 'chmod +x startup.sh'
        sh './startup.sh'
      }
    }

  }
}