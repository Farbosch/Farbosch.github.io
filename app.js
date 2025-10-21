(function(){
  const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
  const money = (n)=> isFinite(n) ? fmt.format(n) : '—';

  const els = {
    timeDisplay: document.getElementById('timeDisplay'),
    startBtn: document.getElementById('startBtn'),
    stopBtn: document.getElementById('stopBtn'),
    resetTimerBtn: document.getElementById('resetTimerBtn'),
    kpiRevenue: document.getElementById('kpiRevenue'),
    kpiCost: document.getElementById('kpiCost'),
    kpiNet: document.getElementById('kpiNet'),
    kpiPph: document.getElementById('kpiPph'),
    kpiTax: document.getElementById('kpiTax'),
    addCostBtn: document.getElementById('addCostBtn'),
    costTbody: document.getElementById('costTbody'),
    addItemBtn: document.getElementById('addItemBtn'),
    itemTbody: document.getElementById('itemTbody'),
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    fileInput: document.getElementById('fileInput'),
    resetAllBtn: document.getElementById('resetAllBtn'),
  };

  const STORAGE_KEY = 'tli-profit-data-v5';
  const defaultState = { timer: { running:false, start:0, elapsed:0 }, costs: [], items: [], settings: { taxEnabled: true } };
  function load(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)); }catch(e){ return null; } }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

  let state = load() || defaultState;
  if (!state || typeof state !== 'object') state = JSON.parse(JSON.stringify(defaultState));
  if (!Array.isArray(state.items)) state.items = [];
  if (!Array.isArray(state.costs)) state.costs = [];
  if (!state.settings) state.settings = { taxEnabled: true }; else state.settings.taxEnabled = true;

  // Ensure existing cost items are migrated to the new structure if they're not already.
  // This is a simple migration. More complex data might need more careful handling.
  state.costs.forEach(cost => {
      if (cost.amount !== undefined && cost.unit === undefined) {
          cost.unit = cost.amount;
          cost.qty = 1;
          delete cost.amount;
          delete cost.notes;
      }
  });
  save(); // Save the potentially migrated state

  let rafId = null;
  function msToHMS(ms){ const s = Math.floor(ms/1000); const hh = String(Math.floor(s/3600)).padStart(2,'0'); const mm = String(Math.floor((s%3600)/60)).padStart(2,'0'); const ss = String(s%60).padStart(2,'0'); return `${hh}:${mm}:${ss}`; }
  function getElapsedMs(){ const now = Date.now(); return state.timer.running ? state.timer.elapsed + (now - state.timer.start) : state.timer.elapsed; }
  function tick(){ const e = getElapsedMs(); els.timeDisplay.textContent = msToHMS(e); updateKPIs(e); if(state.timer.running){ rafId = requestAnimationFrame(tick); } }

  function start(){ if(state.timer.running) return; state.timer.running = true; state.timer.start = Date.now(); save(); cancelAnimationFrame(rafId); tick(); }
  function stop(){ if(!state.timer.running) return; const now = Date.now(); state.timer.elapsed += (now - state.timer.start); state.timer.running = false; state.timer.start = 0; save(); cancelAnimationFrame(rafId); tick(); }
  function resetTimer(){ state.timer = { running:false, start:0, elapsed:0 }; save(); cancelAnimationFrame(rafId); tick(); }

  els.startBtn.addEventListener('click', start);
  els.stopBtn.addEventListener('click', stop);
  els.resetTimerBtn.addEventListener('click', resetTimer);

  function newId(){ return Math.random().toString(36).slice(2,10); }

  function render(){
    // COSTS
    els.costTbody.innerHTML = '';
    state.costs.forEach(row=>{
      const lt = (Number(row.qty)||0) * (Number(row.unit)||0);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text" list="itemNames" value="${row.name||''}" placeholder="Start typing…" data-field="name"></td>
        <td><input type="number" step="1" value="${row.qty??''}" placeholder="0" data-field="qty"></td>
        <td><input type="number" step="0.01" value="${row.unit??''}" placeholder="0" data-field="unit"></td>
        <td>${money(lt)}</td>
        <td class="row-actions">
          <button data-act="dup">Duplicate</button>
          <button class="btn-danger" data-act="del">Delete</button>
        </td>`;
      wireRow(tr, 'costs', row.id);
      els.costTbody.appendChild(tr);
    });

    // ITEMS
    els.itemTbody.innerHTML = '';
    state.items.forEach(row=>{
      const lt = (Number(row.qty)||0) * (Number(row.unit)||0);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text" list="itemNames" value="${row.name||''}" placeholder="Start typing…" data-field="name"></td>
        <td><input type="number" step="1" value="${row.qty??''}" placeholder="0" data-field="qty"></td>
        <td><input type="number" step="0.01" value="${row.unit??''}" placeholder="0" data-field="unit"></td>
        <td>${money(lt)}</td>
        <td class="row-actions">
          <button data-act="dup">Duplicate</button>
          <button class="btn-danger" data-act="del">Delete</button>
        </td>`;
      wireRow(tr, 'items', row.id);
      els.itemTbody.appendChild(tr);
    });

    tick();
  }

  function wireRow(tr, listKey, id){
    const idx = state[listKey].findIndex(r=>r.id===id);
    tr.querySelectorAll('input').forEach(inp=>{
      inp.addEventListener('input', ()=>{
        const field = inp.dataset.field;
        let val = inp.value;
        if(inp.type==='number'){ val = inp.value === '' ? '' : Number(inp.value); }
        const row = state[listKey][idx];
        row[field] = val;
        save();
        
        if(listKey==='items' || listKey==='costs'){
          const qty = Number(row.qty)||0; const unit = Number(row.unit)||0; const lt = qty * unit; const cells = tr.querySelectorAll('td'); if(cells[3]) cells[3].textContent = money(lt);
        }
        updateKPIs(getElapsedMs());
      });
    });
    const del = tr.querySelector('[data-act="del"]'); if(del) del.addEventListener('click', ()=>{ state[listKey].splice(idx,1); save(); render(); });
    const dup = tr.querySelector('[data-act="dup"]'); if(dup) dup.addEventListener('click', ()=>{ const copy = JSON.parse(JSON.stringify(state[listKey][idx])); copy.id = newId(); state[listKey].splice(idx+1, 0, copy); save(); render(); });
  }

  els.addCostBtn.addEventListener('click', ()=>{ state.costs.push({ id:newId(), name:'', qty:'', unit:'' }); save(); render(); });
  els.addItemBtn.addEventListener('click', ()=>{ state.items.push({ id:newId(), name:'', qty:'', unit:'' }); save(); render(); });

  function totals() {
      const revenueGross = state.items.reduce((s, r) => s + (Number(r.qty) || 0) * (Number(r.unit) || 0), 0);
      const cost = state.costs.reduce((s, r) => s + (Number(r.qty) || 0) * (Number(r.unit) || 0), 0);
      const tax = Math.floor(revenueGross / 8);
      const revenue = revenueGross - tax;
      const net = revenue - cost;
      return { revenueGross, tax, revenue, cost, net };
  }

  function updateKPIs(elapsedMs) {
      const { revenue, tax, cost, net }.totals();
      els.kpiRevenue.textContent = money(revenue);
      els.kpiTax.textContent = money(tax);
      els.kpiCost.textContent = money(cost);
      els.kpiNet.textContent = money(net);
      const hours = elapsedMs / (1000 * 60 * 60);
      const pph = hours > 0 ? net / hours : 0;
      els.kpiPph.textContent = money(pph);
  }

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e)=>{
    if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return; // Don't trigger shortcuts if user is typing in a field
    }
    if (e.code === 'Space') {
        e.preventDefault();
        state.timer.running ? stop() : start();
    } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetTimer();
    }
  });

  // Handle data import/export and reset
  els.exportBtn.addEventListener('click', () => {
      const dataStr = JSON.stringify(state, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tli-farm-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  });

  els.importBtn.addEventListener('click', () => {
      els.fileInput.click();
  });

  els.fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const importedData = JSON.parse(e.target.result);
              // Basic validation
              if (importedData && typeof importedData.timer === 'object' && Array.isArray(importedData.items) && Array.isArray(importedData.costs)) {
                  state = importedData;
                  // Run the same migration on imported data
                  state.costs.forEach(cost => {
                      if (cost.amount !== undefined && cost.unit === undefined) {
                          cost.unit = cost.ang;
                          cost.qty = 1;
                          delete cost.amount;
                          delete cost.notes;
                      }
                  });
                  save();
                  render();
              } else {
                  alert('Invalid JSON file format.');
              }
          } catch (err) {
              alert('Error parsing JSON file.');
              console.error(err);
          } finally {
              els.fileInput.value = ''; // Reset file input
          }
      };
      reader.readAsText(file);
  });

  els.resetAllBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all data, including the timer? This cannot be undone.')) {
          state = JSON.parse(JSON.stringify(defaultState));
          save();
          render();
      }
  });

  render(); // Initial render
})();
