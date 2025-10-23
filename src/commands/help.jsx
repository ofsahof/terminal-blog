import React from "react";

export default {
    name: 'help',
    description: 'Show this help message.',

    execute: (args, context) => {
        return (
            <div className='help-grid'>
                {Object.values(context.allCommands).map((command) => (
                    <React.Fragment key={command.name}>
                        <span style={{ color: 'var(--blue)' }}>
                            {command.name}
                        </span>
                        <span>{command.description}</span>
                    </React.Fragment>
                ))}
            </div>
        );
    },
};
