    document.addEventListener('DOMContentLoaded', () => {
            // --- ESTADO DA APLICAÇÃO ---
            let students = JSON.parse(localStorage.getItem('edu_students')) || [];
            let deleteCandidateId = null;

            // --- ELEMENTOS DO DOM ---
            const studentForm = document.getElementById('studentForm');
            const studentIdInput = document.getElementById('studentId');
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const registrationInput = document.getElementById('registration');
            const birthDateInput = document.getElementById('birthDate');
            const courseInput = document.getElementById('course');

            const formTitle = document.getElementById('formTitle');
            const formIcon = document.getElementById('formIcon');
            const btnSubmitText = document.getElementById('btnSubmitText');
            const btnCancelEdit = document.getElementById('btnCancelEdit');

            const studentsTableBody = document.getElementById('studentsTableBody');
            const emptyState = document.getElementById('emptyState');
            const totalCountBadge = document.getElementById('totalCountBadge');
            const showingCountText = document.getElementById('showingCountText');

            const searchInput = document.getElementById('searchInput');
            const btnClearSearch = document.getElementById('btnClearSearch');

            const deleteModal = document.getElementById('deleteModal');
            const deleteStudentName = document.getElementById('deleteStudentName');
            const btnCancelDelete = document.getElementById('btnCancelDelete');
            const btnConfirmDelete = document.getElementById('btnConfirmDelete');

            const toastContainer = document.getElementById('toastContainer');

            // --- ERROS DOS CAMPOS ---
            const errors = {
                fullName: document.getElementById('errFullName'),
                email: document.getElementById('errEmail'),
                registration: document.getElementById('errRegistration'),
                birthDate: document.getElementById('errBirthDate'),
                course: document.getElementById('errCourse')
            };

            // --- INICIALIZAÇÃO ---
            renderTable();

            // --- EVENT LISTENERS ---

            // Submissão do Formulário
            studentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (validateForm()) {
                    saveStudent();
                }
            });

            // Filtro em Tempo Real
            searchInput.addEventListener('input', () => {
                renderTable();
            });

            // Limpar Filtro
            btnClearSearch.addEventListener('click', () => {
                searchInput.value = '';
                renderTable();
            });

            // Cancelar Edição
            btnCancelEdit.addEventListener('click', resetForm);

            // Modal Exclusão
            btnCancelDelete.addEventListener('click', closeDeleteModal);
            btnConfirmDelete.addEventListener('click', confirmDeleteStudent);

            // Limpeza de erros em tempo real ao digitar
            fullNameInput.addEventListener('input', () => clearFieldError('fullName'));
            emailInput.addEventListener('input', () => clearFieldError('email'));
            registrationInput.addEventListener('input', () => clearFieldError('registration'));
            birthDateInput.addEventListener('change', () => clearFieldError('birthDate'));
            courseInput.addEventListener('change', () => clearFieldError('course'));

            // --- FUNÇÕES DE VALIDAÇÃO ---
            function validateForm() {
                let isValid = true;
                const idCurrent = studentIdInput.value;

                // Validação Nome
                const nameVal = fullNameInput.value.trim();
                if (nameVal.length < 3) {
                    showFieldError('fullName', 'Nome deve ter no mínimo 3 caracteres.');
                    isValid = false;
                } else {
                    clearFieldError('fullName');
                }

                // Validação E-mail
                const emailVal = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailVal)) {
                    showFieldError('email', 'Por favor, informe um e-mail válido.');
                    isValid = false;
                } else {
                    clearFieldError('email');
                }

                // Validação Matrícula
                const regVal = registrationInput.value.trim();
                if (regVal === '') {
                    showFieldError('registration', 'A matrícula é obrigatória.');
                    isValid = false;
                } else {
                    // Verificar se já existe matrícula repetida em outro aluno
                    const duplicateReg = students.find(s => s.registration.toLowerCase() === regVal.toLowerCase() && s.id !== idCurrent);
                    if (duplicateReg) {
                        showFieldError('registration', 'Esta matrícula já está cadastrada.');
                        isValid = false;
                    } else {
                        clearFieldError('registration');
                    }
                }

                // Validação Data de Nascimento
                const birthVal = birthDateInput.value;
                if (!birthVal) {
                    showFieldError('birthDate', 'Informe a data de nascimento.');
                    isValid = false;
                } else {
                    clearFieldError('birthDate');
                }

                // Validação Curso
                const courseVal = courseInput.value;
                if (!courseVal) {
                    showFieldError('course', 'Selecione um curso.');
                    isValid = false;
                } else {
                    clearFieldError('course');
                }

                return isValid;
            }

            function showFieldError(field, message) {
                const inputElem = document.getElementById(field);
                const errorElem = errors[field];
                if (inputElem) inputElem.classList.add('border-red-500', 'bg-red-50');
                if (errorElem) {
                    errorElem.textContent = message;
                    errorElem.classList.remove('hidden');
                }
            }

            function clearFieldError(field) {
                const inputElem = document.getElementById(field);
                const errorElem = errors[field];
                if (inputElem) inputElem.classList.remove('border-red-500', 'bg-red-50');
                if (errorElem) errorElem.classList.add('hidden');
            }

            function clearAllErrors() {
                Object.keys(errors).forEach(key => clearFieldError(key));
            }

            // --- OPERAÇÕES CRUD ---

            function saveStudent() {
                const id = studentIdInput.value;
                const studentData = {
                    id: id || Date.now().toString(),
                    fullName: fullNameInput.value.trim(),
                    email: emailInput.value.trim(),
                    registration: registrationInput.value.trim(),
                    birthDate: birthDateInput.value,
                    course: courseInput.value
                };

                if (id) {
                    // Atualização
                    const index = students.findIndex(s => s.id === id);
                    if (index !== -1) {
                        students[index] = studentData;
                        showToast('Dados do aluno atualizados com sucesso!', 'info');
                    }
                } else {
                    // Inclusão
                    students.unshift(studentData);
                    showToast('Aluno cadastrado com sucesso!', 'success');
                }

                persistData();
                resetForm();
                renderTable();
            }

            function editStudent(id) {
                const student = students.find(s => s.id === id);
                if (!student) return;

                // Preencher inputs
                studentIdInput.value = student.id;
                fullNameInput.value = student.fullName;
                emailInput.value = student.email;
                registrationInput.value = student.registration;
                birthDateInput.value = student.birthDate;
                courseInput.value = student.course;

                // Alterar Interface para modo Edição
                formTitle.querySelector('span').textContent = 'Editar Aluno';
                formIcon.className = 'fa-solid fa-user-pen text-amber-500';
                btnSubmitText.textContent = 'Salvar Alterações';
                btnCancelEdit.classList.remove('hidden');
                
                clearAllErrors();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            function openDeleteModal(id) {
                const student = students.find(s => s.id === id);
                if (!student) return;

                deleteCandidateId = id;
                deleteStudentName.textContent = student.fullName;
                deleteModal.classList.remove('hidden');
            }

            function closeDeleteModal() {
                deleteCandidateId = null;
                deleteModal.classList.add('hidden');
            }

            function confirmDeleteStudent() {
                if (!deleteCandidateId) return;

                students = students.filter(s => s.id !== deleteCandidateId);
                persistData();
                renderTable();
                closeDeleteModal();
                showToast('Registro de aluno removido.', 'warning');

                // Se o aluno deletado for o que estava sendo editado, resetar formulário
                if (studentIdInput.value === deleteCandidateId) {
                    resetForm();
                }
            }

            function resetForm() {
                studentForm.reset();
                studentIdInput.value = '';
                formTitle.querySelector('span').textContent = 'Cadastrar Aluno';
                formIcon.className = 'fa-solid fa-user-plus text-indigo-600';
                btnSubmitText.textContent = 'Cadastrar Aluno';
                btnCancelEdit.classList.add('hidden');
                clearAllErrors();
            }

            function persistData() {
                localStorage.setItem('edu_students', JSON.stringify(students));
            }

            // --- RENDERIZAÇÃO DA TABELA ---
            function renderTable() {
                const filter = searchInput.value.toLowerCase().trim();
                
                const filteredStudents = students.filter(s => 
                    s.fullName.toLowerCase().includes(filter) || 
                    s.registration.toLowerCase().includes(filter)
                );

                studentsTableBody.innerHTML = '';

                if (filteredStudents.length === 0) {
                    emptyState.classList.remove('hidden');
                    emptyState.classList.add('flex');
                } else {
                    emptyState.classList.add('hidden');
                    emptyState.classList.remove('flex');

                    filteredStudents.forEach(student => {
                        const tr = document.createElement('tr');
                        tr.className = 'hover:bg-slate-50/80 transition duration-150';

                        // Formatando a Data
                        const dateParts = student.birthDate.split('-');
                        const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : student.birthDate;

                        tr.innerHTML = `
                            <td class="py-3.5 px-4">
                                <div class="flex items-center space-x-3">
                                    <div class="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shadow-sm">
                                        ${getInitials(student.fullName)}
                                    </div>
                                    <div>
                                        <div class="font-medium text-slate-900">${escapeHtml(student.fullName)}</div>
                                        <div class="text-xs text-slate-500">${escapeHtml(student.email)}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3.5 px-4 font-mono text-xs font-semibold text-slate-600">
                                ${escapeHtml(student.registration)}
                            </td>
                            <td class="py-3.5 px-4">
                                <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                                    ${escapeHtml(student.course)}
                                </span>
                            </td>
                            <td class="py-3.5 px-4 text-xs text-slate-600">
                                ${formattedDate}
                            </td>
                            <td class="py-3.5 px-4 text-right">
                                <div class="flex items-center justify-end space-x-2">
                                    <button class="btn-edit p-2 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition" title="Editar Aluno" data-id="${student.id}">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button class="btn-delete p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition" title="Excluir Aluno" data-id="${student.id}">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </td>
                        `;
                        studentsTableBody.appendChild(tr);
                    });

                    // Atribuir Eventos aos Botões de Ação da Tabela
                    document.querySelectorAll('.btn-edit').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            const id = e.currentTarget.getAttribute('data-id');
                            editStudent(id);
                        });
                    });

                    document.querySelectorAll('.btn-delete').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            const id = e.currentTarget.getAttribute('data-id');
                            openDeleteModal(id);
                        });
                    });
                }

                // Atualização dos Contadores
                totalCountBadge.textContent = students.length;
                showingCountText.textContent = `Exibindo ${filteredStudents.length} de ${students.length} registro(s)`;
            }

            // --- UTILITÁRIOS DE UX ---
            function getInitials(name) {
                if (!name) return 'A';
                const parts = name.trim().split(' ');
                if (parts.length >= 2) {
                    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                }
                return parts[0][0].toUpperCase();
            }

            function escapeHtml(str) {
                return str.replace(/[&< me"']/g, function(m) {
                    return {
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        "'": '&#039;'
                    }[m];
                });
            }

            function showToast(message, type = 'success') {
                const toast = document.createElement('div');
                
                let bgClass = 'bg-slate-800 text-white';
                let iconClass = 'fa-circle-check text-emerald-400';

                if (type === 'success') {
                    bgClass = 'bg-slate-900 text-white border-l-4 border-emerald-500';
                    iconClass = 'fa-circle-check text-emerald-400';
                } else if (type === 'info') {
                    bgClass = 'bg-slate-900 text-white border-l-4 border-indigo-500';
                    iconClass = 'fa-circle-info text-indigo-400';
                } else if (type === 'warning') {
                    bgClass = 'bg-slate-900 text-white border-l-4 border-amber-500';
                    iconClass = 'fa-triangle-exclamation text-amber-400';
                }

                toast.className = `${bgClass} toast-enter px-4 py-3 rounded-lg shadow-lg text-xs font-medium flex items-center gap-3 pointer-events-auto max-w-sm`;
                toast.innerHTML = `
                    <i class="fa-solid ${iconClass} text-base"></i>
                    <span class="flex-grow">${message}</span>
                `;

                toastContainer.appendChild(toast);

                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transition = 'opacity 0.3s ease-out';
                    setTimeout(() => toast.remove(), 300);
                }, 3500);
            }
        });
        // Função para carregar os dados do arquivo JSON externo
function carregarDadosDoJson() {
    fetch('dados.json')
        .then(response => {
            // Verifica se o arquivo foi encontrado com sucesso
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON: ' + response.statusText);
            }
            return response.json(); // Converte a resposta para JSON/JavaScript
        })
        .then(data => {
            // 'data' agora contém o conteúdo do arquivo JSON
            console.log("Dados carregados com sucesso!", data);

            // Se o teu JSON tem uma propriedade chamada "estudantes", podes guardá-la numa variável:
            let estudantes = data.estudantes;

            // Aqui chamas a função que renderiza os dados na tua tabela ou lista (igual fazias antes)
            renderizarTabela(estudantes);
        })
        .catch(error => {
            console.error("Houve um erro ao buscar o JSON:", error);
        });
}

// Executa a função assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarDadosDoJson();
});

function renderizarTabela(listaAlunos) {
    // Exemplo rápido de uso dos dados
    listaAlunos.forEach(aluno => {
        console.log(`Nome: ${aluno.fullName} - Curso: ${aluno.course}`);
    });
}
if ('Servidor' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(() => {
        console.error("Erro no Service Worker:", erro);
    })
}