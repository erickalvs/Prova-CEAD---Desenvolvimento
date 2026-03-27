# Diagrama de Entidade e Relacionamento (ER)

Este diagrama descreve a estrutura do banco de dados do sistema de agendamento de eventos CEAD.

```mermaid
erDiagram
    SALA ||--o{ EVENTO : "hospeda"
    PESSOA ||--o{ EVENTO_PESSOA : "participa"
    EVENTO ||--o{ EVENTO_PESSOA : "inclui"

    SALA {
        bigint id PK
        string nome
        string tipo
        int capacidade
        string andar
        string descricao
        datetime created_at
        datetime updated_at
    }

    PESSOA {
        bigint id PK
        string nome
        string email UK
        string celular
        string cpf UK
        datetime created_at
        datetime updated_at
    }

    EVENTO {
        bigint id PK
        string titulo
        string tipo
        bigint sala_id FK
        int num_participantes
        datetime data_inicio
        datetime data_fim
        text descricao
        datetime created_at
        datetime updated_at
    }

    EVENTO_PESSOA {
        bigint id PK
        bigint evento_id FK
        bigint pessoa_id FK
        string papel
        datetime created_at
        datetime updated_at
    }
```

## Relacionamentos
1.  **Sala -> Evento**: Uma sala pode hospedar múltiplos eventos, mas cada evento ocorre em apenas uma sala (1:N).
2.  **Evento -> Pessoa (Pivô)**: Um evento possui várias pessoas vinculadas (como organizadores ou palestrante) e uma pessoa pode participar de vários eventos (N:M). O papel da pessoa no evento (organizador, palestrante, participante) é definido na tabela pivô `evento_pessoa`.
