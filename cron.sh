folder_name='shippn-backend-development'
folder_path='/var/jenkins_home/workspace/TestJob'
branch_name='dev'

cd $folder_path
echo 'folder path '$folder_path

head_local=`git rev-parse --short HEAD`
git fetch
head_remote=`git rev-parse --short origin/$branch_name`

if [[ $head_local != $head_remote ]]; then
	
	node ~/jenkins_node/job.js
    exit 1;
fi

cd ~


