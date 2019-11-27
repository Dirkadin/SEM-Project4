pipeline {
  agent any
  stages {
    stage('Change Directory') {
      steps {
        dir(path: 'ordering-service')
      }
    }

    stage('Run Startup Script') {
      steps {
        sh 'chmod +x startup.sh'
        sh './startup.sh'
      }
    }

  }
}