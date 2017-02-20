[![Build Status][travis-image]][travis-url]
# Small/Medium Business Admin Interface

Admin interface for the Small/Medium Business server

## Building and Installing the Snap
To build the snap:

```bash
$ git clone https://github.com/ubuntu-core/smb-admin.git
$ cd smb-admin
$ snapcraft
```

To install the snap use:
```bash
$ sudo snap install --dangerous smb-admin_[version]_amd64.snap
```

Where [version] will be the version of the snap e.g. smb-admin_0.1_amd64.snap.

Once the snap is installed, it needs to have the __snapd-control__ interface connected to be able to fetch 
information about the snaps.
```bash
$ sudo snap connect smb-admin:snapd-control :snapd-control
$ snap interfaces
```

## Building the Web Interface
The snap includes a pre-built web interface, that includes the javascript code and assets (CSS files and images).
To set up an environment to build the web interface:

### Install NVM
Install the [Node Version Manager](https://github.com/creationix/nvm) that will allow a specific
version of Node.js to be installed. Follow the installation instructions.

### Install the latest stable Node.js and npm
The latest stable (LTS) version of Node can be found on the [Node website](nodejs.org).
```bash
# Overview of available commands
nvm help

# Install the latest stable version
nvm install v5.4.1

# Select the version to use
nvm ls
nvm use v5.4.1
```

### Install the Node.js dependencies
```bash
cd smb-admin/webapp
npm install
```

### Build the project assets
This will rebuild the javascript, CSS and image assets in the static directory.
```bash
# Select the version to use
nvm ls
nvm use v5.4.1

# Run the build scripts from the webapp directory
cd smb-admin/webapp
./build-all.sh
```


[travis-image]: https://travis-ci.org/ubuntu-core/smb-admin.svg?branch=master
[travis-url]: https://travis-ci.org/ubuntu-core/smb-admin
