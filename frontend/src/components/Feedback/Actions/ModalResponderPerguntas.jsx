import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

export const ModalResponderPerguntas = ({ onClose }) => {
    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            BackdropProps={{
                style: {
                    backgroundColor: 'transparent',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 2,
                }}
            >
                <div className='flex justify-between items-center'>
                    <h2 className="text-lg font-semibold text-gray-700">Confirmar Saída</h2>
                    <CloseIcon />
                </div>
                <p id="modal-description">Aqui você pode responder a pergunta.</p>
                {/* Adicione aqui o formulário ou conteúdo do modal */}
            </Box>
        </Modal>
    )
}
