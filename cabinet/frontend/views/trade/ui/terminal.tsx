import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

const TERMINAL_ROOT = "grid w-full grid-cols-1 gap-px bg-border text-ink text-sm lg:h-[calc(100dvh-var(--ev-shell-offset,0px))] lg:grid-cols-[minmax(0,1fr)_18rem_20rem] lg:grid-rows-[auto_minmax(0,1fr)_14rem]";
const terminalAreaClasses = {
  ticker: "lg:col-span-3 lg:row-start-1",
  chart: "lg:col-start-1 lg:row-start-2",
  book: "lg:col-start-2 lg:row-start-2",
  form: "lg:col-start-3 lg:row-start-2",
  orders: "lg:col-span-3 lg:row-start-3",
} as const;
const TERMINAL_PANE = "flex min-h-0 min-w-0 flex-col overflow-hidden bg-card";
const TERMINAL_PANE_HEADER = "flex h-9 shrink-0 items-center gap-2 border-b border-border px-3 text-xs font-medium text-ink-mid";
const TERMINAL_PANE_BODY = "flex min-h-0 flex-1 flex-col overflow-auto";
const TERMINAL_CHART = "relative min-h-72 flex-1 overflow-hidden";
const TERMINAL_TICKER = "flex min-w-0 items-center gap-6 overflow-x-auto bg-card px-4 py-2 whitespace-nowrap";
const TERMINAL_TICKER_STAT = "flex shrink-0 flex-col gap-0.5";
const TERMINAL_TICKER_LABEL = "text-xs uppercase tracking-wide text-ink-soft";
const TERMINAL_TICKER_VALUE = "font-mono text-sm tabular-nums text-ink";
const bookSideClasses = {
  bid: "text-positive",
  ask: "text-accent-error",
} as const;
const bookDepthClasses = {
  bid: "bg-positive/15",
  ask: "bg-accent-error/15",
} as const;
const ORDER_BOOK = "flex min-h-0 flex-1 flex-col font-mono text-xs tabular-nums";
const ORDER_BOOK_HEAD = "grid shrink-0 grid-cols-3 gap-2 px-3 py-1.5 text-right text-xs text-ink-soft [&>*:first-child]:text-left";
const ORDER_BOOK_ROW = "relative isolate grid cursor-pointer grid-cols-3 gap-2 px-3 py-0.5 text-right leading-5 hover:bg-hover";
const ORDER_BOOK_PRICE = "text-left";
const ORDER_BOOK_DEPTH = "pointer-events-none absolute inset-y-0 right-0 -z-10";
const ORDER_BOOK_SPREAD = "flex shrink-0 items-center justify-between gap-2 border-y border-border bg-muted/50 px-3 py-1 text-ink-mid";
const TRADES_TAPE_ROW = "grid grid-cols-3 gap-2 px-3 py-0.5 text-right font-mono text-xs leading-5 tabular-nums hover:bg-hover";
const ORDER_FORM = "flex flex-col gap-3 p-3 text-sm";
const ORDER_FORM_ROW = "flex items-center justify-between gap-2 text-xs";
const ORDER_FORM_LABEL = "text-ink-soft";
const ORDER_FORM_VALUE = "font-mono tabular-nums text-ink";
const ORDER_FORM_SUBMIT_BASE = "inline-flex h-10 w-full shrink-0 cursor-pointer items-center justify-center rounded-[var(--control-radius)] text-sm font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50";
const orderSideClasses = {
  buy: "bg-positive text-on-positive hover:bg-positive/90",
  sell: "bg-accent-error text-on-accent-error hover:bg-accent-error/90",
} as const;
const OPEN_ORDERS_EMPTY = "flex flex-1 items-center justify-center p-6 text-sm text-ink-soft";

type TerminalArea = keyof typeof terminalAreaClasses;
type BookSide = keyof typeof bookSideClasses;
type OrderSide = keyof typeof orderSideClasses;

export function Terminal({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="terminal" className={cn(TERMINAL_ROOT, className)} {...props} />;
}

export function TerminalPane({ area, className, ...props }: ComponentProps<"section"> & { area: TerminalArea }) {
  return <section data-slot="terminal-pane" data-area={area} className={cn(TERMINAL_PANE, terminalAreaClasses[area], className)} {...props} />;
}

export function TerminalPaneHeader({ className, ...props }: ComponentProps<"header">) {
  return <header data-slot="terminal-pane-header" className={cn(TERMINAL_PANE_HEADER, className)} {...props} />;
}

export function TerminalPaneBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="terminal-pane-body" className={cn(TERMINAL_PANE_BODY, className)} {...props} />;
}

export function TerminalChart({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="terminal-chart" className={cn(TERMINAL_CHART, className)} {...props} />;
}

export function TerminalTicker({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="terminal-ticker" data-area="ticker" className={cn(TERMINAL_TICKER, terminalAreaClasses.ticker, className)} {...props} />;
}

export function TickerStat({ label, value, className, ...props }: Omit<ComponentProps<"div">, "children"> & { label: ReactNode; value: ReactNode }) {
  return (
    <div data-slot="ticker-stat" className={TERMINAL_TICKER_STAT} {...props}>
      <span className={TERMINAL_TICKER_LABEL}>{label}</span>
      <span className={cn(TERMINAL_TICKER_VALUE, className)}>{value}</span>
    </div>
  );
}

export function OrderBook({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="order-book" className={cn(ORDER_BOOK, className)} {...props} />;
}

export function OrderBookHead({ price, size, total, className, ...props }: Omit<ComponentProps<"div">, "children"> & { price: ReactNode; size: ReactNode; total: ReactNode }) {
  return (
    <div data-slot="order-book-head" className={cn(ORDER_BOOK_HEAD, className)} {...props}>
      <span>{price}</span>
      <span>{size}</span>
      <span>{total}</span>
    </div>
  );
}

export function OrderBookRow({
  side,
  price,
  size,
  total,
  depth = 0,
  className,
  ...props
}: Omit<ComponentProps<"div">, "children"> & { side: BookSide; price: ReactNode; size: ReactNode; total: ReactNode; depth?: number }) {
  return (
    <div data-slot="order-book-row" data-side={side} className={cn(ORDER_BOOK_ROW, className)} {...props}>
      <span aria-hidden="true" className={cn(ORDER_BOOK_DEPTH, bookDepthClasses[side])} style={{ width: `${Math.round(Math.min(1, Math.max(0, depth)) * 100)}%` }} />
      <span className={cn(ORDER_BOOK_PRICE, bookSideClasses[side])}>{price}</span>
      <span>{size}</span>
      <span>{total}</span>
    </div>
  );
}

export function OrderBookSpread({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="order-book-spread" className={cn(ORDER_BOOK_SPREAD, className)} {...props} />;
}

export function TradesTapeRow({ side, price, size, time, className, ...props }: Omit<ComponentProps<"div">, "children"> & { side: BookSide; price: ReactNode; size: ReactNode; time: ReactNode }) {
  return (
    <div data-slot="trades-tape-row" data-side={side} className={cn(TRADES_TAPE_ROW, className)} {...props}>
      <span className={cn(ORDER_BOOK_PRICE, bookSideClasses[side])}>{price}</span>
      <span>{size}</span>
      <span>{time}</span>
    </div>
  );
}

export function OrderForm({ className, onSubmit, ...props }: ComponentProps<"form">) {
  return (
    <form
      data-slot="order-form"
      className={cn(ORDER_FORM, className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      {...props}
    />
  );
}

export function OrderFormRow({ label, value, className, ...props }: Omit<ComponentProps<"div">, "children"> & { label: ReactNode; value: ReactNode }) {
  return (
    <div data-slot="order-form-row" className={cn(ORDER_FORM_ROW, className)} {...props}>
      <span className={ORDER_FORM_LABEL}>{label}</span>
      <span className={ORDER_FORM_VALUE}>{value}</span>
    </div>
  );
}

export function OrderFormSubmit({ side = "buy", className, ...props }: Omit<ComponentProps<"button">, "type"> & { side?: OrderSide }) {
  return <button type="submit" data-slot="order-form-submit" data-side={side} className={cn(ORDER_FORM_SUBMIT_BASE, orderSideClasses[side], className)} {...props} />;
}

export function OpenOrdersEmpty({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="open-orders-empty" className={cn(OPEN_ORDERS_EMPTY, className)} {...props} />;
}
