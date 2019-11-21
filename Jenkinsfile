pipeline {
  agent any
  stages {
    stage('Build Ordering') {
      steps {
        sh "cd ordering-service"
        sh "chmod +x startup.sh"
        sh "./startup.sh"
      }
    }
    stage('Build Monitoring') {
      steps {
        sh "cd monitoring-service"
        sh "chmod +x startup.sh"
        sh "./startup.sh"
      }
    }
  }
}
