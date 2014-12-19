{process-instructions, mobilize-robots} = require \./terminal

martian-robots = process-instructions >> mobilize-robots

martian-robots process.argv[2]
