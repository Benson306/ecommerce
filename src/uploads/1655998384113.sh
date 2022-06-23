#!/bin/bash
STATUS_FILE=last.txt
if [ -f "$STATUS_FILE" ]; then
  num=$(cat $STATUS_FILE)
fi

for i in {1..25}
do
  fn=$(expr $num + $i)
  touch "ndiwaKimtai${fn}.txt"
done

echo $fn > $STATUS_FILE
