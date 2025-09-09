pipeline {
    agent any // Indica que Jenkins puede usar cualquier agente disponible

    stages {
        stage('Build App Image') {
            steps {
                script {
                    echo 'Construyendo la imagen de la aplicación...'
                    // Construimos la imagen Docker para la app y le ponemos una etiqueta
                    sh 'docker build -t nicoaaa/sample-app:latest .'
                }
            }
        }

        stage('Run E2E Tests') {
            steps {
                script {
                    echo 'Ejecutando pruebas E2E con Cypress...'
                    // Usamos un bloque 'dir' para asegurarnos de que se ejecute en el contexto del workspace
                    dir('.') {
                        // El 'withRun' inicia un contenedor (nuestra app) y nos da una variable para controlarlo
                        docker.image('nicoaaa/sample-app:latest').withRun('-d --name sample_app --network=sample-app_jenkinsnet', 'app') {
                            
                            // Esperamos un momento para que el servidor de la app inicie completamente
                            sleep 10 

                            // Construimos la imagen de Cypress
                            docker.build('cypress-image', '-f Dockerfile.cypress .')

                            // Ejecutamos las pruebas DENTRO del contenedor de Cypress
                            // ¡Ojo al baseUrl! Apunta al nombre del contenedor de la app, no a localhost
                            docker.image('cypress-image').inside("--network=sample-app_jenkinsnet --entrypoint=''") {
                                sh 'npm install'
                                sh 'npx cypress run --reporter mochawesome --config baseUrl=http://sample_app:5050'
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // Este bloque se ejecuta siempre, haya éxito o fallo
            echo 'Limpiando contenedores y publicando reporte...'
            
            // Publicamos el reporte HTML generado por Mochawesome
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'mochawesome-report',
                reportFiles: 'mochawesome.html',
                reportName: 'Reporte de Pruebas Cypress'
            ])

            // Detenemos y eliminamos el contenedor de la app para no dejar basura
            sh 'docker stop sample_app || true'
            sh 'docker rm sample_app || true'
        }
    }
}