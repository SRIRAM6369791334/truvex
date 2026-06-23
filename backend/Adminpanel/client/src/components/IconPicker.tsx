import { useMemo, useState, type ComponentType } from 'react';
import {
  Activity, Anchor, Archive, Award, Bell, Box, BriefcaseBusiness, Building2, Camera,
  ChartBar, ChartPie, ChevronDown, CircleCheck, CircleDollarSign, Clipboard, Clock,
  Cloud, CloudUpload, Compass, Cpu, CreditCard, Database, Droplet, Factory, FileText,
  Flame, Folder, Gift, Globe, Hammer, HardHat, Headphones, Heart, Hexagon, House,
  Image, Inbox, Info, Key, Layers, LayoutDashboard, Link, List, Lock, Mail, Map,
  MapPin, MessageSquare, Monitor, Navigation, Package, Paperclip, PenTool, Percent,
  Phone, Printer, Radio, RefreshCw, Repeat, Save, Scissors, Search, Send, Server,
  Settings, Share2, Shield, ShieldCheck, ShoppingBag, ShoppingCart, SlidersHorizontal,
  Smartphone, Speaker, Star, Sun, Tag, Target, Terminal, ThumbsUp, Trash2,
  TrendingUp, TriangleAlert, Truck, Tv, Umbrella, Unlock, User, UserCheck, Users,
  Video, Wifi, Wind, Wrench, Zap,
  type LucideProps,
} from 'lucide-react';

const iconMap: Record<string, ComponentType<LucideProps>> = {
  activity: Activity,
  anchor: Anchor,
  archive: Archive,
  award: Award,
  bell: Bell,
  box: Box,
  briefcase: BriefcaseBusiness,
  building: Building2,
  camera: Camera,
  'chart-bar': ChartBar,
  'chart-pie': ChartPie,
  'circle-check': CircleCheck,
  'circle-dollar-sign': CircleDollarSign,
  clipboard: Clipboard,
  clock: Clock,
  cloud: Cloud,
  'cloud-upload': CloudUpload,
  compass: Compass,
  cpu: Cpu,
  'credit-card': CreditCard,
  database: Database,
  droplet: Droplet,
  factory: Factory,
  'file-text': FileText,
  flame: Flame,
  folder: Folder,
  gift: Gift,
  globe: Globe,
  hammer: Hammer,
  'hard-hat': HardHat,
  headphones: Headphones,
  heart: Heart,
  hexagon: Hexagon,
  house: House,
  image: Image,
  inbox: Inbox,
  info: Info,
  key: Key,
  layers: Layers,
  'layout-dashboard': LayoutDashboard,
  link: Link,
  list: List,
  lock: Lock,
  mail: Mail,
  map: Map,
  'map-pin': MapPin,
  'message-square': MessageSquare,
  monitor: Monitor,
  navigation: Navigation,
  package: Package,
  paperclip: Paperclip,
  'pen-tool': PenTool,
  percent: Percent,
  phone: Phone,
  printer: Printer,
  radio: Radio,
  'refresh-cw': RefreshCw,
  repeat: Repeat,
  save: Save,
  scissors: Scissors,
  search: Search,
  send: Send,
  server: Server,
  settings: Settings,
  cog: Settings,
  'share-2': Share2,
  shield: Shield,
  'shield-check': ShieldCheck,
  'shopping-bag': ShoppingBag,
  'shopping-cart': ShoppingCart,
  'sliders-horizontal': SlidersHorizontal,
  smartphone: Smartphone,
  speaker: Speaker,
  star: Star,
  sun: Sun,
  tag: Tag,
  target: Target,
  terminal: Terminal,
  'thumbs-up': ThumbsUp,
  'trash-2': Trash2,
  'trending-up': TrendingUp,
  'triangle-alert': TriangleAlert,
  truck: Truck,
  tv: Tv,
  umbrella: Umbrella,
  unlock: Unlock,
  user: User,
  'user-check': UserCheck,
  users: Users,
  video: Video,
  wifi: Wifi,
  wind: Wind,
  wrench: Wrench,
  tool: Wrench,
  zap: Zap,
};

const curatedIcons = Object.keys(iconMap).filter((name) => !['cog', 'tool'].includes(name));

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const Component = iconMap[name];
  return Component ? <Component size={size} /> : <span aria-hidden>◇</span>;
}

export function IconPicker({
  value,
  onChange,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => curatedIcons.filter((name) => name.includes(search.trim().toLowerCase())),
    [search],
  );

  return (
    <div className="relative">
      <label className="tw-label" htmlFor="icon-picker-search">Icon Name{required ? ' *' : ''}</label>
      <button
        className="tw-input flex items-center justify-between text-left"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="flex items-center gap-3">
          {value ? <Icon name={value} /> : <span>◇</span>}
          {value || 'Select an icon…'}
        </span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="icon-popover">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              autoFocus
              className="tw-input !pl-9"
              id="icon-picker-search"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search icons…"
              type="search"
              value={search}
            />
          </div>
          <div className="icon-grid">
            {filtered.map((name) => (
              <button
                className={`icon-option ${value === name ? 'selected' : ''}`}
                key={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                type="button"
              >
                <Icon name={name} />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
