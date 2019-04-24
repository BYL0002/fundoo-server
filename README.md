# fundoo-server
Fundoo Back-end developed on Nodejs Express framework &amp; MongoDb as database. Using Redis for caching & amazon-sdk to upload images to amazon s3 bucket.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites or Installation

> Linux:

What things you need to install the software and how to install them

```
npm install - which will install all modules present in package.json file.
```
## afsdfsdfsdfsdfsdfsdfsdf

```sh
npm install my-crazy-module --save
```

## Usage example

A few motivating and useful examples of how your product can be used. Spice this up with code blocks and potentially more screenshots.

_For more examples and usage, please refer to the [Wiki][wiki]._

### Installing

A step by step series of examples that tell you how to get a development env running

```
npm i express
npm i cors
sudo apt-get install redis-server
sudo systemctl enable redis-server.service
npm i aws-sdk
npm i dotenv
---or---
npm install
npm run start
```

And repeat

```
until finished
```

## Code analysis setup

> Describe how to install all development dependencies and how to run an automated code analysis. Potentially do this for multiple platforms.

```sh
sudo apt-get install docker.io
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
npm i sonarqube-scanner
run sonarqube on browser - localhost:9000
```

## Testing setup

> Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
npm i chai
npm i chai-http
npm i mocha
```

## Running the tests

> Explain how to run the automated tests for this system

```sh
change branch to test
npm install
npm run test
```

### Break down into end to end tests

Explain what these tests test and why

```
tests work on input and output of project flow.
Request to hit api and response generated with status code from the operations on request data.
Unit testing done with Json format.
```

## Deployment

> Notes about how to deploy this on a live system

```sh
* [Docker] (https://www.docker.com/) - to get the images of redis, mongodb & etc.
* [AWS Console] (https://aws.amazon.com/console/) to get instances running to provide CICD.
* [Jenkins] (https://jenkins.io/) - to get the job assigned and running with github repo.
* [Github] (https://github.com/) - to make our code best accessible to team.
```

## Built With

* [Express](https://expressjs.com/) - The nodejs framework used to create server
* [Redis](https://redis.io/) - Dependency Management so as to enable caching at api level
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Yash Sharma** - *Initial work* - [BridgeLabz-Yash](https://github.com/BYL0002)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
