import React from 'react';

export default {
    name: 'help',
    description: 'Show this help message.',

    execute: (_args, context) => {
        return (
            <div className='help'>
                <p className='help__title'>Available Commands:</p>
                <div className='help__grid'>
                    {Object.values(context.allCommands).map((command) => (
                        <React.Fragment key={command.name}>
                            <span className='help__command-name'>
                                {command.name}
                            </span>
                            <span className='help__command-desc'>
                                {command.description}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    },
};
