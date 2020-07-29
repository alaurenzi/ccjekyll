#!/bin/bash

cd assets/images

rm -rf mid
mkdir -p mid

for i in *.jpg; do
    [ -f "$i" ] || break
    convert $i -resize 3000x2000 mid/$i
    chmod 666 mid/$i
    jpegoptim --size 300k mid/$i
done

rm -rf sm
mkdir -p sm

for i in *.jpg; do
    [ -f "$i" ] || break
    convert $i -resize 1200x800 sm/$i
    chmod 666 mid/$i
    jpegoptim --size 100k sm/$i
done