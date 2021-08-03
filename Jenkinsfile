pipeline {
agent any
stages {
	stage('build')
		{
			steps	{
					bat 'npm install typescript'
					bat 'npm install cypress --save-dev'              
					bat 'npm run cypress:run'
				}
       	}
	}	
}

