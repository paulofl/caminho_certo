import React from 'react'
import renderer from 'react-test-renderer'

import BotaoMenu from '../../components/BotaoMenu'
import Alert from 'react-native'

describe('<Home />', () => {
    test('Ao entrar na tela Home, devem ser exibidos 3 botões: SOS, REGISTRO e RASTREIO', () => {
        const tree = renderer.create(<Home />)
        const botoes = tree.root.findAllByType(BotaoMenu)

        expect(botoes.length).toBe(3)
        expect(botoes[0].props.titulo.toBe('SOS'))
        expect(botoes[1].props.titulo.toBe('REGISTRO'))
        expect(botoes[2].props.titulo.toBe('RASTREIO'))
    })
    test('Ao clicar no botão SOS o usuário deve ser ecaminhado para a tela de Contataos', () => {
        const navigationMock = {
            navigate: jest.fn()
        }

        const tree = renderer.create(<Home navigation={NavigationMock}/>)
        const botoes = tree.root.findAllByType(BotaoMenu)

        act(() => {
            botoes[0].props.onPress()
        })

        expect(navigationMock.navigate).toHaveBeenCalledTimes()
        expect(navigationMock.navigate.mock.calls[0][0]).toBe('contatos')
        
    })
    test('Ao clicar no botão REGISTRO, o sistema deve exibir um alerta', () => {
        Alert.alert = jest.fn()

        const tree = renderer.create(<Home/>)
        const botoes = tree.root.findAllByType(BotaoMenu)

        act(() => {
            botoes[1].props.onPress()
        })

        expect(Alert.alert).toHaveBeenCalled()
        expect(Alert.alert.mock.calls[0][0]).toBe('Clique em Registro')
        
    })
    test('Ao clicar no botão RASTREIO, o sistema deve exibir um alerta', () => {
        Alert.alert = jest.fn()

        const tree = renderer.create(<Home/>)
        const botoes = tree.root.findAllByType(BotaoMenu)

        act(() => {
            botoes[2].props.onPress()
        })

        expect(Alert.alert).toHaveBeenCalled()
        expect(Alert.alert.mock.calls[0][0]).toBe('Clique em Rastreio')
        
    })

    test('Validar fotografia do component', () => {
        const tree = renderer.create(<Home/>)
        expect(tree.toJSON()).toMatchSnapshot()

    })
})