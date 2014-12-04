{process-instructions, mobilize-robots} = require './terminal'

martian-robots = mobilize-robots . process-instructions

martian-robots process.argv[2]
