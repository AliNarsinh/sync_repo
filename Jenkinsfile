pipeline {
    agent any 

    environment {
        DEPLOY_BRANCH = 'main'
    }

    stages {
        stage("Check Branch") {
            when {
                expression {
                    return env.GIT_BRANCH?.replaceFirst(/^origin\//, '') == "${DEPLOY_BRANCH}"
                }
            }
            steps {
                echo "✅ Triggered on correct branch: ${env.GIT_BRANCH}"
            }
        }

        stage("Verify Github Authentication") {
            when {
                expression {
                    return env.GIT_BRANCH?.replaceFirst(/^origin\//, '') == "${DEPLOY_BRANCH}"
                }
            }
            steps {
                checkout scmGit(
                    branches: [[name: "*/${DEPLOY_BRANCH}"]],
                    extensions: [],
                    userRemoteConfigs: [[
                        credentialsId: 'binnah-gitToken',
                        url: 'https://github.com/IrzexBolt/binah-frontend'
                    ]]
                )
            }
        }

        stage("Stop and Remove Old Container") {
            when {
                expression {
                    return env.GIT_BRANCH?.replaceFirst(/^origin\//, '') == "${DEPLOY_BRANCH}"
                }
            }
            steps {
                script {
                    sh 'docker stop binah-frontend || true'
                    sh 'docker rm -f binah-frontend || true'
                    sh 'docker rmi -f binah-frontend:latest || true'
                    sh 'docker build --no-cache -t binah-frontend:latest .'
                }
            }
        }

        stage("Building Docker Container") {
            when {
                expression {
                    return env.GIT_BRANCH?.replaceFirst(/^origin\//, '') == "${DEPLOY_BRANCH}"
                }
            }
            steps {
                script {
                    try {
                        sh 'docker run -d -p 3000:3000 --name binah-frontend binah-frontend:latest'
                    } catch (Exception e) {
                        echo "❌ Error running new container: ${e.message}"
                    }
                }
            }
        }

        stage("Cleanup") {
            when {
                expression {
                    return env.GIT_BRANCH?.replaceFirst(/^origin\//, '') == "${DEPLOY_BRANCH}"
                }
            }
            steps {
                script {
                    sh 'docker image prune -a --force'
                    sh 'docker system prune -a -f'
                }
            }
        }

        stage("Pipeline Finished") {
            when {
                expression {
                    return env.GIT_BRANCH?.replaceFirst(/^origin\//, '') == "${DEPLOY_BRANCH}"
                }
            }
            steps {
                echo "✅ Pipeline execution finished for ${DEPLOY_BRANCH}"
            }
        }
    }

    post {
        success {
            script {
                if (env.GIT_BRANCH?.replaceFirst(/^origin\//, '') == "${DEPLOY_BRANCH}") {
                    sh """
                        curl -X POST -H 'Content-type: application/json' \\
                        --data '{\"text\":\"✅ *binah-frontend (${DEPLOY_BRANCH})* deployment successful on *${JOB_NAME}* (build #${BUILD_NUMBER})\"}' \\
                        'https://hooks.slack.com/services/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'
                    """
                }
            }
        }
        failure {
            script {
                if (env.GIT_BRANCH?.replaceFirst(/^origin\//, '') == "${DEPLOY_BRANCH}") {
                    sh """
                        curl -X POST -H 'Content-type: application/json' \\
                        --data '{\"text\":\"❌ *binah-frontend (${DEPLOY_BRANCH})* deployment FAILED on *${JOB_NAME}* (build #${BUILD_NUMBER})\"}' \\
                        'https://hooks.slack.com/services/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'
                    """
                }
            }
        }
    }
}
