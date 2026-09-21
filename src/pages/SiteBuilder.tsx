import { useState } from 'react';
import {
  Monitor, Smartphone, Eye, Save, Plus, Settings,
  Image, Type, Layout, Columns, AlignLeft,
  Home, FileText, BookOpen, Phone, Globe, ArrowUp, ArrowDown, Trash2,
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import MasonicHex from '../components/ui/MasonicHex';
import './SiteBuilder.css';

type PreviewMode = 'desktop' | 'mobile';

const pages = [
  { id: 'home', label: 'Home', icon: <Home size={14} />, status: 'published' },
  { id: 'about', label: 'Sobre', icon: <BookOpen size={14} />, status: 'published' },
  { id: 'blog', label: 'Blog', icon: <FileText size={14} />, status: 'published' },
  { id: 'contact', label: 'Contato', icon: <Phone size={14} />, status: 'draft' },
  { id: 'members-portal', label: 'Portal do Irmão', icon: <Globe size={14} />, status: 'published' },
];

const blocks = [
  { id: 'hero', label: 'Hero / Banner', icon: <Layout size={16} />, type: 'layout' },
  { id: 'text', label: 'Bloco de Texto', icon: <AlignLeft size={16} />, type: 'content' },
  { id: 'columns', label: 'Colunas', icon: <Columns size={16} />, type: 'layout' },
  { id: 'image', label: 'Imagem', icon: <Image size={16} />, type: 'media' },
  { id: 'title', label: 'Título', icon: <Type size={16} />, type: 'content' },
];

const canvasBlocks = [
  {
    id: 'cb-1', type: 'hero',
    preview: (
      <div className="canvas-hero-preview">
        <div className="canvas-hero-preview__content">
          <div className="canvas-hero-preview__badge">Grande Oriente do Maranhão e Balsas</div>
          <div className="canvas-hero-preview__title">Bem-vindo à<br />Loja Luz e Progresso</div>
          <div className="canvas-hero-preview__sub">Fraternidade, igualdade e progresso — desde 1965.</div>
          <div className="canvas-hero-preview__actions">
            <div className="canvas-hero-preview__btn canvas-hero-preview__btn--accent">Conheça a Loja</div>
            <div className="canvas-hero-preview__btn canvas-hero-preview__btn--outline">Contato</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cb-2', type: 'columns',
    preview: (
      <div className="canvas-columns-preview">
        {['Fraternidade', 'Igualdade', 'Liberdade'].map((t, i) => (
          <div key={i} className="canvas-col-card">
            <div className="canvas-col-card__icon">
              <MasonicHex size={32} variant={i === 1 ? 'accent' : 'gradient'} />
            </div>
            <div className="canvas-col-card__title">{t}</div>
            <div className="canvas-col-card__desc">Pilar fundamental da maçonaria moderna e humanista.</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'cb-3', type: 'text',
    preview: (
      <div className="canvas-text-preview">
        <div className="canvas-text-preview__title">Nossa História</div>
        <div className="canvas-text-preview__body">
          Fundada em 22 de agosto de 1965, a Loja Luz e Progresso tem sido um farol de sabedoria e fraternidade na capital maranhense. Com quase seis décadas de existência, nossa loja tem formado homens íntegros e contribuído para a construção de uma sociedade mais justa.
        </div>
      </div>
    ),
  },
];

export default function SiteBuilder() {
  const [activePage, setActivePage] = useState('home');
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const [selectedBlock, setSelectedBlock] = useState<string | null>('cb-1');
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  };

  return (
    <div className="site-builder page-enter">
      {/* Top bar */}
      <div className="sb-topbar">
        <div className="sb-topbar-left">
          <div className="sb-site-url">
            <Globe size={14} />
            <span>luzeprogresso.gomb.org.br</span>
            <Badge variant="accent" size="sm">Publicado</Badge>
          </div>
        </div>

        <div className="sb-topbar-center">
          <div className="sb-preview-switcher">
            <button
              className={`sb-preview-btn ${previewMode === 'desktop' ? 'sb-preview-btn--active' : ''}`}
              onClick={() => setPreviewMode('desktop')}
              id="preview-desktop"
            >
              <Monitor size={15} />
              Desktop
            </button>
            <button
              className={`sb-preview-btn ${previewMode === 'mobile' ? 'sb-preview-btn--active' : ''}`}
              onClick={() => setPreviewMode('mobile')}
              id="preview-mobile"
            >
              <Smartphone size={15} />
              Mobile
            </button>
          </div>
        </div>

        <div className="sb-topbar-right">
          <Button variant="ghost" size="sm" icon={<Eye size={14} />}>Preview</Button>
          <Button
            variant={showSaved ? 'accent' : 'primary'}
            size="sm"
            icon={<Save size={14} />}
            onClick={handleSave}
            id="save-site-btn"
          >
            {showSaved ? '✓ Salvo!' : 'Salvar'}
          </Button>
        </div>
      </div>

      <div className="sb-workspace">
        {/* Left: Pages & Blocks */}
        <div className="sb-sidebar">
          {/* Pages */}
          <div className="sb-panel">
            <div className="sb-panel-header">
              <span>Páginas</span>
              <button className="sb-panel-add" id="add-page-btn"><Plus size={13} /></button>
            </div>
            <div className="sb-pages-list">
              {pages.map(page => (
                <button
                  key={page.id}
                  className={`sb-page-item ${activePage === page.id ? 'sb-page-item--active' : ''}`}
                  onClick={() => setActivePage(page.id)}
                  id={`page-${page.id}`}
                >
                  <span className="sb-page-icon">{page.icon}</span>
                  <span className="sb-page-label">{page.label}</span>
                  <Badge
                    size="sm"
                    variant={page.status === 'published' ? 'accent' : 'warning'}
                  >
                    {page.status === 'published' ? 'Pub.' : 'Rascunho'}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Block library */}
          <div className="sb-panel">
            <div className="sb-panel-header">
              <span>Adicionar Bloco</span>
            </div>
            <div className="sb-blocks-grid">
              {blocks.map(block => (
                <button key={block.id} className="sb-block-item" id={`block-${block.id}`} draggable>
                  <div className="sb-block-icon">{block.icon}</div>
                  <div className="sb-block-label">{block.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Canvas */}
        <div className="sb-canvas-area">
          <div className={`sb-canvas ${previewMode === 'mobile' ? 'sb-canvas--mobile' : ''}`}>
            {/* Simulated browser chrome */}
            <div className="sb-browser-chrome">
              <div className="sb-browser-dots">
                <div style={{ background: '#ff5f57' }} />
                <div style={{ background: '#febc2e' }} />
                <div style={{ background: '#28c840' }} />
              </div>
              <div className="sb-browser-url">
                🔒 {activePage === 'home' ? '' : activePage}.luzeprogresso.gomb.org.br
              </div>
            </div>

            <div className="sb-canvas-content">
              {/* Simulated nav */}
              <div className="canvas-nav">
                <div className="canvas-nav__brand">
                  <MasonicHex size={22} variant="gradient" />
                  <span>Luz e Progresso</span>
                </div>
                <div className="canvas-nav__links">
                  {['Início', 'Sobre', 'Blog', 'Contato'].map(l => (
                    <div key={l} className="canvas-nav__link">{l}</div>
                  ))}
                </div>
                <div className="canvas-nav__cta">Portal</div>
              </div>

              {/* Blocks */}
              {canvasBlocks.map(block => (
                <div
                  key={block.id}
                  className={`canvas-block ${selectedBlock === block.id ? 'canvas-block--selected' : ''}`}
                  onClick={() => setSelectedBlock(block.id)}
                >
                  {selectedBlock === block.id && (
                    <div className="canvas-block__controls">
                      <div className="canvas-block__label">{block.type}</div>
                      <div className="canvas-block__actions">
                        <button className="canvas-block__action-btn" title="Mover para cima"><ArrowUp size={12} /></button>
                        <button className="canvas-block__action-btn" title="Mover para baixo"><ArrowDown size={12} /></button>
                        <button className="canvas-block__action-btn" title="Configurações"><Settings size={12} /></button>
                        <button className="canvas-block__action-btn canvas-block__action-btn--danger" title="Remover"><Trash2 size={12} /></button>
                      </div>
                    </div>
                  )}
                  {block.preview}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Properties */}
        <div className="sb-properties">
          <div className="sb-properties-header">
            <span>Propriedades</span>
            {selectedBlock && (
              <Badge variant="primary" size="sm">
                {canvasBlocks.find(b => b.id === selectedBlock)?.type || 'bloco'}
              </Badge>
            )}
          </div>

          {selectedBlock ? (
            <div className="sb-properties-content">
              <div className="sb-prop-section">
                <div className="sb-prop-section-title">Layout</div>
                <div className="sb-prop-group">
                  <label className="sb-prop-label">Padding</label>
                  <select className="sb-prop-select">
                    <option>Médio (40px)</option>
                    <option>Pequeno (20px)</option>
                    <option>Grande (80px)</option>
                    <option>Nenhum</option>
                  </select>
                </div>
                <div className="sb-prop-group">
                  <label className="sb-prop-label">Alinhamento</label>
                  <div className="sb-prop-align">
                    {['⬤', '⬤', '⬤'].map((_, i) => (
                      <button key={i} className={`sb-prop-align-btn ${i === 1 ? 'sb-prop-align-btn--active' : ''}`}>
                        {['←', '=', '→'][i]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sb-prop-section">
                <div className="sb-prop-section-title">Aparência</div>
                <div className="sb-prop-group">
                  <label className="sb-prop-label">Cor de Fundo</label>
                  <div className="sb-prop-colors">
                    {['#FFFFFF', '#F8FAFC', '#4298B5', '#0f2233', 'gradient'].map((color, i) => (
                      <div
                        key={i}
                        className={`sb-prop-color ${i === 2 ? 'sb-prop-color--active' : ''}`}
                        style={{
                          background: color === 'gradient' ? 'linear-gradient(135deg, #4298B5, #00C288)' : color,
                          border: color === '#FFFFFF' ? '1.5px solid var(--color-border)' : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="sb-prop-group">
                  <label className="sb-prop-label">Altura mínima</label>
                  <input type="text" defaultValue="500px" className="sb-prop-input" />
                </div>
              </div>

              <div className="sb-prop-section">
                <div className="sb-prop-section-title">Tipografia</div>
                <div className="sb-prop-group">
                  <label className="sb-prop-label">Fonte</label>
                  <select className="sb-prop-select">
                    <option>Plus Jakarta Sans</option>
                    <option>Inter</option>
                    <option>Merriweather</option>
                  </select>
                </div>
              </div>

              <Button variant="primary" fullWidth size="sm">Aplicar Alterações</Button>
            </div>
          ) : (
            <div className="sb-properties-empty">
              <div className="sb-properties-empty__icon">🎨</div>
              <div>Selecione um bloco para editar suas propriedades</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
