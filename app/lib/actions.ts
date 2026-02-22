import { type ActionBarItem } from '@components/ActionBar';

const actions: ActionBarItem[] = [
    {
        hotkey:'CTRL+E',
        body: "TOGGLE EXPLORER",
    },
    {
        body: "PREFS",
        items: [
            {
                icon: '⊹',
                children: 'Light',
            },
            {
                icon: '⊹',
                children: 'Dark',
            },
        ]
    },
    {
        body: "PANIC!",
    }
];

export default actions;