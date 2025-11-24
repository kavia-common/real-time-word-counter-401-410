#!/bin/bash
cd /tmp/kavia/workspace/code-generation/real-time-word-counter-401-410/frontend_react_js
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

