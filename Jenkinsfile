pipeline {
  agent any
  stages {
    stage('Build Ordering') {
      steps {
	echo pwd
        sh "cd ordering-service"
	echo pwd
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
