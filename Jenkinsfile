pipeline {
agent any
stages {
	stage('build')
		{
			steps	{
					sh 'npm install typescript'
					sh 'npm install cypress --save-dev'  
					sh 'npm install salty-cypress-testrail-reporter --save-dev'           
					sh 'npx cypress run . --reporter salty-cypress-testrail-reporter'
				}
       	}
	}	
}

