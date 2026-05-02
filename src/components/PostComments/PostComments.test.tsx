import { fireEvent, render, screen } from '@testing-library/react';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
        expect(screen.getByTestId('post-comments-textarea')).toBeInTheDocument();
        expect(screen.getByTestId('post-comments-submit')).toBeInTheDocument();
    });

    it('Deve permitir a inserção de dois comentários', () => {
        render(<PostComment />);

        const textarea = screen.getByTestId('post-comments-textarea');
        const button = screen.getByTestId('post-comments-submit');

        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(button);

        fireEvent.change(textarea, { target: { value: 'Segundo comentário' } });
        fireEvent.click(button);

        const comments = screen.getAllByTestId('post-comment');
        expect(comments).toHaveLength(2);
        expect(comments[0]).toHaveTextContent('Primeiro comentário');
        expect(comments[1]).toHaveTextContent('Segundo comentário');
    });
});