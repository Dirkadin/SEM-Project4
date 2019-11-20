pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('startup') {
      steps {
        sh './startup.sh'
      }
    }

  }
}