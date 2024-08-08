import { trigger, state, style, transition, animate, query, stagger, group } from "@angular/animations";

export const animations = [
    trigger('listAnimation', [
        transition(':enter', [
            style({ opacity: 0, position: 'relative', top: '-10px' }),
            animate('0.2s',
                style({ opacity: 1, position: 'relative', top: '0' }))
        ]),
        transition(':leave', [
            style({ opacity: 1, position: 'relative', right: '0', }),
            animate('0.4s',
                style({ opacity: 0, position: 'relative', right: '25vw' })),
        ])
    ])
];