pipeline {
    options {
        timestamps()
    }
    parameters {
        string(name: 'BUILD_VERSION', defaultValue: '', description: 'The build version to deploy (optional)')
    }
    agent {
        label 'ncatsldvifx01'
    }
    triggers {
        pollSCM('H/5 * * * *')
    }  
  environment {
        PROJECT_NAME = "gard-frontend"
        DOCKER_REPO_NAME = "registry.ncats.nih.gov:5000/gard-frontend"
    }
    stages {
        stage('Build Version') {
            when {
                expression {
                    return !params.BUILD_VERSION
                }
            }
            steps{
                script {
                    BUILD_VERSION_GENERATED = VersionNumber(
                        versionNumberString: 'v${BUILD_YEAR, XX}.${BUILD_MONTH, XX}${BUILD_DAY, XX}.${BUILDS_TODAY}',
                        projectStartDate:    '1970-01-01',
                        skipFailedBuilds:    true)
                    currentBuild.displayName = BUILD_VERSION_GENERATED
                    env.BUILD_VERSION = BUILD_VERSION_GENERATED
                    env.BUILD = 'true'
                }
            }
        }
        stage('Build') {
            when {
                expression {
                    return !params.BUILD_VERSION
                }
            }
            steps {
                sshagent (credentials: ['871f96b5-9d34-449d-b6c3-3a04bbd4c0e4']) {
                    nodejs(configId: 'kw-npmrc', nodeJSInstallationName: 'Node.js 12.13') {
                        withEnv([
                            "IMAGE_NAME=gard-frontend",
                            "BUILD_VERSION=" + (params.BUILD_VERSION ?: env.BUILD_VERSION)
                        ]) {
                            checkout scm

                            sh 'git config --global url."git@github.com:".insteadOf "https://github.com/"'
                            sh 'npm i'
                            sh 'npm install -g @angular/cli'
                            sh 'NODE_OPTIONS=--max_old_space_size=4096 ng build --prod'
            

                            script {
                                docker.withRegistry("https://registry.ncats.nih.gov:5000", "564b9230-c7e3-482d-b004-8e79e5e9720a") {
                                    def image = docker.build(
                                        "${env.IMAGE_NAME}:${env.BUILD_VERSION}",
                                        "--no-cache --build-arg SOURCE_FOLDER=./dist ."
                                    )
                                    // Push the image to the registry
                                    image.push("${env.BUILD_VERSION}")
                                }
                            }
                        }
                    }
                }
            }
        }
        stage('Deploy docker') {
            agent {
                node { label 'ncatsldvifx01'}
            }
            steps {
                cleanWs()
                checkout scm
                configFileProvider([
                    configFile(fileId: 'gard-dev-docker-compose', targetLocation: 'docker-compose.yml')     
                ]) {
                   script {
                        def docker = new org.labshare.Docker()
                        docker.deployDockerUI()
                    }
                }
            }
        }
    }
}
