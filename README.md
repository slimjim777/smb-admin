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


[travis-image]: https://travis-ci.org/ubuntu-core/smb-admin.svg?branch=master
[travis-url]: https://travis-ci.org/ubuntu-core/smb-admin
