pipeline {
    agent any
    post {
      failure {
        updateGitlabCommitStatus name: 'build', state: 'failed'
      }
      success {
        updateGitlabCommitStatus name: 'build', state: 'success'
      }
    }
    options {
      gitLabConnection('Gitlab')
      gitlabBuilds(builds: ["Prepare", "Build", "Test"])
    }
    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
    }
    stages {
      stage("Prepare") {
        steps {
          gitlabCommitStatus(name: "Prepare") {
            bat 'npm ci'
          }
        }
      }

      stage("Build") {
        steps {
          gitlabCommitStatus(name: "Build") {
            bat 'npm run-script build'
          }
        }
      }

      stage("Test") {
        steps {
          gitlabCommitStatus(name: "Test") {
            bat 'npm test'
          }
        }
      }
    }
}