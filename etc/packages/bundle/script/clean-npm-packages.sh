#!/usr/bin/sh

# NOTE: Prefer `yarn clean` / `lerna clean`

_workingDirectory="$(pwd)"

__findAndRemove()
{
    _relpath=$1
    _fileName=$2

    find "$_workingDirectory/$_relpath" -type f -name "$_fileName" -exec rm -rf {} +
}

__cleanNpmPackages()
{
    _relpath=$1

    __findAndRemove "$_relpath" 'node_modules'
    __findAndRemove "$_relpath" 'package-lock.json'
    __findAndRemove "$_relpath" 'yarn.lock'
}

__cleanNpmPackages 'etc'
__cleanNpmPackages 'lib'
__cleanNpmPackages 'packages'
