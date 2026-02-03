import { type ActionBarItem, type ActionBarProps } from '@components/ActionBar';

const siteActions: ActionBarItem[] = [
    {
        body: "Test",
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
    }
];

export default siteActions;